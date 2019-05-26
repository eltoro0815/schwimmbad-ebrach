<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Schwimmbad Ebrach geöffnet?</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" >

        <!-- Styles -->
        <style>
           
            .content {
                text-align: center;
            }

           
        </style>
    </head>
    <body>

            <div class="content">
                @if ($geeoffnet->offen == 1)
                    <button type="button" class="btn btn-success">Das Schwimmbad Ebrach ist gerade geöffnet!</button>
                @else
                    <button type="button" class="btn btn-danger">Das Schwimmbad Ebrach ist gerade geschlossen!</button>
                @endif
            </div>
        </div>
    </body>
</html>
