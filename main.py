import json
import glob
import sys
import datetime
import numpy as np
import pandas as pd
import pylab as plt
from flask import Flask,render_template
from flask import request
from sodapy import Socrata
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("dashboard.html")

@app.route("/hospitals", methods = ['POST','GET'])
def gethospitals():
    df = pd.read_csv('static/data/HospitalBedsIndia.csv')
    df = df.fillna(int(0))
    rows = json.dumps(df.to_dict(orient='records'), indent=2)
    cols = json.dumps(list(df.columns))
    # Filter regions by date range
    data = { 'rows': rows, 'cols': cols}
    return data

@app.route("/getconfirmedcases", methods=['POST', 'GET'])
def stackedarea():
    df = pd.read_csv('static/data/covid_19_india.csv')
    states = df['State/UnionTerritory'].unique()
    regions = [df[df['State/UnionTerritory'] == s] for s in states]

    # Filter regions by date range
    start, end = 25, 40
    regions = [r[start:end] for r in regions]

    # Get top 10 states by confirmed cases
    confirmed = [(r['Confirmed'].iloc[-1], s, i) for i, (s, r) in enumerate(zip(states, regions)) if len(r) > 0]
    confirmed = sorted(confirmed, reverse=True)[:10]
    stateids = [k for _, _, k in confirmed]
    states = [j for _, j, _ in confirmed]

    # Get daily confirmed cases for top 10 states
    df = pd.concat([r['Confirmed'] for r in regions if len(r) > 0 and r['State/UnionTerritory'].iloc[0] in states], axis=1)
    df.columns = states
    df['total'] = df.sum(axis=1)
    df['day'] = range(end - start)
    rows = df.to_dict(orient='records')
    cols = json.dumps(list(df.columns))
    data = {'rows': rows, 'cols': cols}
    return data



@app.route("/get_time_series_data/<state>/<column>")
def time_series_data(state, column):
    is_aggregated = request.args.get('aggr', False)
    start_date = request.args.get('startDate', '01/01/2020') or '01/01/2020'
    end_date = request.args.get('endDate', '01/01/2021') or '01/01/2021'
    
    start_date = datetime.datetime.strptime(start_date, '%m/%d/%Y')
    end_date = datetime.datetime.strptime(end_date, '%m/%d/%Y')

    # Get daily confirmed cases for top 10 states
    df = pd.read_csv('static/data/covid19India.csv')
    if state != '' and state != 'all':
        df = df[df.name == state]

    # Get daily confirmed cases for top 10 states
    df['date'] = pd.to_datetime(df['Last Update'])
    df = df.set_index('date')

    if is_aggregated:
        if state != 'all':
            start_value = df.loc[start_date, column].max()
            end_value = df.loc[end_date, column].max()
            return str(end_value - start_value)

        start_values = df.loc[start_date, column].max(level=0).sum()
        end_values = df.loc[end_date, column].max(level=0).sum()
        return str(end_values - start_values)

    df = df.loc[start_date:end_date]
    df = df.sort_values('date')
    
    if state == 'all':
        df = df.groupby(['date', 'name'])[column].max().reset_index()
        daily_diff = df.groupby('date')[column].sum().diff()[1:]
        values = [abs(x) for x in daily_diff.tolist()]
        dates = daily_diff.index.strftime('%Y-%m-%d').tolist()
    # Get daily confirmed cases for top 10 states
        return {"values": values, "dates": dates}

    daily_diff = df.groupby('date')[column].max().diff()[1:]
    values = daily_diff.tolist()
    dates = daily_diff.index.strftime('%Y-%m-%d').tolist()
    return {"values": values, "dates": dates}


@app.route("/get_map_data")
def get_map_data():
    first_date = request.args.get('startDate', '01/01/2020') or '01/01/2020'
    first_date = datetime.datetime.strptime(first_date, '%m/%d/%Y')

    last_date = request.args.get('endDate', '5/20/2020') or '5/20/2020'
    last_date = datetime.datetime.strptime(last_date, '%m/%d/%Y')

    # print(startDate, endDate, request.args.get('startDate'), request.args.get('endDate'))
    
    df_overall_big = pd.read_csv('static/data/covid19India.csv')
    
    df_overall_big = df_overall_big.rename(columns = {'name':'states'})
    df_overall_big = df_overall_big.sort_values('Last Update')
    df_overall_big['date'] = df_overall_big['Last Update'].map(lambda x: datetime.datetime.strptime(x, '%Y-%m-%d'))
    mask_for_date = (df_overall_big['date'] >= first_date) & (df_overall_big['date'] <= last_date)
    df_overall_big = df_overall_big[mask_for_date]
    df_overall_big = df_overall_big.groupby('states').agg({'Confirmed': 'sum', 'Deaths': 'sum', 'Recovered': 'sum'})
    # print(df_aggr)
    # Get daily confirmed cases for top 10 states
    return df_overall_big[['Confirmed', 'Deaths', 'Recovered']].to_csv(header=True)

@app.route("/get_radar_data/<state>")
def get_radar_data(state):
    global results_df
    # Get daily confirmed cases for top 10 states
    ratio = request.args.get('fraction', 'True') or 'True'
    ratio = bool(ratio)
    if state == 'all':
        state = 'India'
    # if state != 'all':
    males_data = results_df[(results_df.sex == 'Male') & (results_df.state == state)][['age_group', 'covid_19_deaths']].fillna(0)
    males_data = males_data.rename(columns = {'age_group' : 'axis', 'covid_19_deaths': 'value'})
    males_data['value'] = males_data['value'].astype('int')
    males_data.fillna(0, inplace=True)

    females_data = results_df[(results_df.sex == 'Female') & (results_df.state == state)][['age_group', 'covid_19_deaths']].fillna(0)
    females_data = females_data.rename(columns={'age_group': 'axis', 'covid_19_deaths': 'value'})
    females_data['value'] = females_data['value'].astype('int')
    females_data.fillna(0, inplace=True)

    if not ratio:
        return { 'male' : males_data.to_dict('records'), 'female' : females_data.to_dict('records')}
    
    males_data['value'] = males_data['value']/ males_data['value'].sum()
    females_data['value'] = females_data['value'] / females_data['value'].sum()
    return {'male': males_data.to_dict('records'), 'female': females_data.to_dict('records')}


client = Socrata("data.cdc.gov", None)
results = client.get("9bhg-hcku", limit=2000)
results_df = pd.DataFrame.from_records(results)

if __name__ == "__main__":
    # Get daily confirmed cases for top 10 states
    app.run('localhost', '6060')
