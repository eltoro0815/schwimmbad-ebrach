<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Schwimmbad Ebrach geöffnet?</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <link href="css/app.css" rel="stylesheet" type="text/css">


</head>

<body>
    <div>
        <form action="{{ $url }}">
            @if ($isadmin == 1)
            <input type="hidden" name="admin" value="true">
            <input type="hidden" name="change" value="true">
            @endif

            @if ($geeoffnet->offen == 1)
            <button type="submit" class="btn btn-success btn-lg btn-block">Das Schwimmbad Ebrach
                <br>ist gerade geöffnet!</button>
            @else
            <button type="submit" class="btn btn-danger  btn-lg btn-block">Das Schwimmbad Ebrach
                <br>ist gerade geschlossen!</button>
            @endif
        </form>
    </div>
    </div>
</body>

</html>