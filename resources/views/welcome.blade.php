<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Schwimmbad Ebrach geöffnet?</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <link href="css/app.css" rel="stylesheet" type="text/css" >

       
    </head>
    <body>
            <div>
                @if ($geeoffnet->offen == 1)
                    <button type="button" class="btn btn-success btn-lg btn-block">Das Schwimmbad Ebrach ist gerade geöffnet!</button>
                @else
                    <button type="button" class="btn btn-danger  btn-lg btn-block">Das Schwimmbad Ebrach ist gerade geschlossen!</button>
                @endif
            </div>
        </div>
    </body>
</html>
