# -*- coding: utf-8 -*-
from flask import Flask, request, render_template, make_response, Response
import sys
import json
from PrometheusService import create_rules_model, get_rule, get_rule_detail, update_rules_model, delete_rules_model
import PrometheusConfig
import os

reload(sys)
sys.setdefaultencoding('utf8')


app = Flask(__name__)


@app.route('/prometheus/add', methods=['POST'])
def add():
    content = json.dumps('创建成功')
    try:
        name = request.form['name']
        expr = request.form['expr']
        level = request.form['level']
        _for = request.form['_for']
        desc = request.form['desc']
        model = request.form['model']
        service = request.form['service']
        rs = create_rules_model(name, expr, level, _for, desc, model, service)
        if rs == 1:
            return json.dumps('error! please check the path is exist and Permission!')
    except Exception, e:
        print e
        content = json.dumps('error')

    resp = Response(content)
    return resp


@app.route('/prometheus/update', methods=['POST'])
def update():
    content = json.dumps('修改成功')
    try:
        _name = request.form['_name']
        name = request.form['name']
        expr = request.form['expr']
        level = request.form['level']
        _for = request.form['_for']
        desc = request.form['desc']
        model = request.form['model']
        service = request.form['service']
        rs = update_rules_model(name, expr, level, _for, desc, model, _name, service)
        if rs == 1:
            return json.dumps('error! please check the path is exist and Permission!')
    except Exception, e:
        print e
        content = json.dumps('error!')

    resp = Response(content)
    return resp


@app.route('/prometheus/delete', methods=['POST'])
def delete():
    content = json.dumps('删除成功')
    try:
        _name = request.form['_name']
        delete_rules_model(_name)
    except Exception, e:
        print e
        content = json.dumps('error! please check the path is exist and Permission!')
    resp = Response(content)
    return resp


@app.route('/prometheus/getRulesList', methods=['POST'])
def get_rules_list():
    try:
        content = get_rule()
    except Exception, e:
        print e
        content = []

    resp = Response(json.dumps(content))
    return resp


@app.route('/prometheus/getRulesDetail', methods=['POST'])
def get_rules_detail():
    try:
        name = request.form['name']
        content = get_rule_detail(name)
    except Exception, e:
        print e
        content = {'name': '', 'alert': '', 'expr': '', '_for': '', 'level': '', 'summary': '', 'description': ''}
    resp = Response(json.dumps(content))
    return resp


@app.route('/', methods=['GET'])
def open_web():
    # return render_template('rulesWeb.html')
    return app.send_static_file('pages/rulesWeb.html')


@app.route('/prometheus/AddRules', methods=['GET'])
def open_html():
    # return render_template('rulesWeb.html')
    return app.send_static_file('pages/rulesWeb.html')


@app.route('/prometheus/UpdateRules')
def update_html():
    # return render_template('rulesWeb.html')
    return app.send_static_file('pages/update.html')


@app.route('/prometheus/GetInfo', methods=['POST'])
def get_info():
    result = {}
    try:
        result['servers'] = PrometheusConfig.services
        result['alerm'] = PrometheusConfig.alarms
    except Exception, e:
        print e
    return json.dumps(result)


@app.route('/prometheus/refresh', methods=['POST'])
def refresh():
    try:
        # os.system("curl -X POST --connect-timeout 10 -m 20 http://172.16.0.143:9090/-/reload >/dev/null")
        rs = os.popen("curl -X POST --connect-timeout 10 -m 20 http://127.0.0.1:9090/-/reload").read()
        if rs.strip() != '':
            return json.dumps("refresh fail, please check the prometheus.yml")
        return json.dumps("refresh success!")
    except Exception, e:
        print e
        return json.dumps("refresh fail")

if __name__ == '__main__':
    app.run("0.0.0.0", 8888)
