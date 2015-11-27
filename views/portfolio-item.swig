{% extends "_layout.swig" %}

{% block title %}{{project.title}}{% endblock %}

{% block content %}

	<h1>{{project.title}}</h1>

	{{project.description|markdown}}

{% endblock %}
