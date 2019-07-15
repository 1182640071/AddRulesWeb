# -*- coding: utf-8 -*-
from PrometheusDao import write_file, get_rules, get_detail, update_write_file, delete_file


redis_fixed_text = """#{'name': '{{ name }}', 'service': '{{ service }}', 'alert': '{{ alert }}', 'expr': '{{ expr }}', '_for': '{{ for }}', 'level': '{{ level }}', 'summary': '{{ summary }}', 'description': '{{ description }}'}
groups:
- name: {{ name }}
  rules:
  - alert: {{ alert }}
    expr: {{ expr }}
    for: {{ for }}
    labels:
      level: "{{ level }}"
      service: "{{ service }}"
    annotations:
      summary: "{{ summary }}"
      description: "{{ description }}"
"""


def create_rules_model(name, expr, level, _for, desc, model, service):
    try:
        rule = redis_fixed_text.replace('{{ name }}', name + '_rule')
        rule = rule.replace('{{ alert }}', name)
        rule = rule.replace('{{ expr }}', expr)
        rule = rule.replace('{{ for }}', _for)
        rule = rule.replace('{{ level }}', level)
        rule = rule.replace('{{ summary }}', model)
        rule = rule.replace('{{ description }}', desc)
        rule = rule.replace('{{ service }}', service)
        rs = write_file(name, rule)
        return rs
    except Exception, e:
        print e
        return 1


def update_rules_model(name, expr, level, _for, desc, model, _name, service):
    try:
        rule = redis_fixed_text.replace('{{ name }}', name + '_rule')
        rule = rule.replace('{{ alert }}', name)
        rule = rule.replace('{{ expr }}', expr)
        rule = rule.replace('{{ for }}', _for)
        rule = rule.replace('{{ level }}', level)
        rule = rule.replace('{{ summary }}', model)
        rule = rule.replace('{{ description }}', desc)
        rule = rule.replace('{{ service }}', service)
        rs = update_write_file(name, rule, _name)
        return rs
    except Exception, e:
        print e
        return 1


def delete_rules_model(_name):
    try:
        rs = delete_file(_name)
        return rs
    except Exception, e:
        print e
        return 1


def get_rule():
    rs = get_rules()
    return rs


def get_rule_detail(name):
    return get_detail(name)
