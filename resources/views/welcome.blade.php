<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Schwimmbad Ebrach geöffnet?</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <link href="css/app.css" rel="stylesheet" type="text/css">
    <script src="js/app.js"></script>

</head>

<body>

    <form action="">
        @if ($isadmin == 1)
        <input type="hidden" name="admin" value="true">
        <input type="hidden" name="change" value="true">
        @endif

        @if ($geeoffnet->offen == 1)
        <button type="submit" class="btn btn-success btn-lg btn-block">
            @else
            <button type="submit" class="btn btn-danger  btn-lg btn-block">
                @endif

                <div class="container">
                    <div class="row">
                        <div class="col-3 align-self-center">
                            @if ($isadmin == 1)
                            <i class="fas fa-hammer fa-4x"></i>
                            @else
                            <i class="fas fa-sync fa-4x"></i>
                            @endif
                        </div>

                        <div class="col-6">

                            <br>Das Schwimmbad Ebrach
                            @if ($geeoffnet->offen == 1)
                            <br>ist gerade geöffnet!
                            @else
                            <br>ist gerade geschlossen!
                            @endif

                            @if ($isadmin == 1 && $geeoffnet->offen == 1)

                            <br><br>Klicken um auf "Geschlossen" zu wechseln
                            <br><br>
                            @elseif ($isadmin == 1 && $geeoffnet->offen == 0)
                            <br><br>Klicken um auf "Geöffnet" zu wechseln
                            <br><br>
                            @elseif ($isadmin == 0)
                            <br><br>Klicken zum Aktualisieren
                            <br><br>
                            @endif
                        </div>

                        <div class="col-3 align-self-center">
                            @if ($isadmin == 1)
                            <i class="fas fa-hammer fa-4x"></i>
                            @else
                            <i class="fas fa-sync fa-4x"></i>
                            @endif
                        </div>
                    </div>
                </div>
            </button>
    </form>


</body>

</html>