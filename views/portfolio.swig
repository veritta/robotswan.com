<!DOCTYPE html>
<html>
<head>
	<title>Portfolio</title>
</head>
<body>

	<ul>
		{% for project in projects %}
			<li><a href="/portfolio/{{project.slug}}">{{project.title}}</a></li>
		{% endfor %}
	</ul>

</body>
</html>
