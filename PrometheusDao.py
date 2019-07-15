# -*- coding: utf-8 -*-
from PrometheusConfig import filepath
import os


def write_file(filename, content):

    if filepath.endswith('/'):
        rule_file = filepath + filename + '.yml'
    else:
        rule_file = filepath + '/' + filename + '.yml'
    try:
        with open(rule_file, 'w') as f:
            f.write(content)
        return 0
    except Exception, e:
        print e
        return 1


def update_write_file(filename, content, _name):

    if filepath.endswith('/'):
        rule_file = filepath + filename + '.yml'
        _file = filepath + _name + '.yml'
    else:
        rule_file = filepath + '/' + filename + '.yml'
        _file = filepath + '/' + _name + '.yml'

    os.system("mv " + _file + ' ' + rule_file)

    try:
        with open(rule_file, 'w') as f:
            f.write(content)
        return 0
    except Exception, e:
        print e
        return 1


def delete_file(_name):

    if filepath.endswith('/'):
        _file = filepath + _name + '.yml'
    else:
        _file = filepath + '/' + _name + '.yml'

    try:
        os.system("rm -rf " + _file)
        return 0
    except Exception, e:
        print e
        return 1


def get_rules():
    rs = []
    try:
        for root, dirs, files in os.walk(filepath):
            rs.append(files)
    except Exception, e:
        print e
    return rs


def get_detail(filename):
    try:
        if filepath.endswith('/'):
            rule_file = filepath + filename + '.yml'
        else:
            rule_file = filepath + '/' + filename + '.yml'

        content = os.popen('head -1 ' + rule_file).read()
        values = eval(content[1:len(content)])
        return values
    except Exception, e:
        print e
        return {'name': '', 'alert': '', 'expr': '', '_for': '', 'level': '', 'summary': '', 'description': ''}
