@extends("master")
@section('content')
    <div style="width: 85%; float: left;">
        <table class="table table-hover table-bordered table-responsive  break" id="main-table">
            <thead>
            <tr>
                <th>CampId</th>
                <th>CampName</th>
                <th>Created Date</th>
                <th>Go Campaign</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($tests as $test)
                <tr> <td id='campId'>{{$test->test_id}}</td><td id='spApi'>{{$test->name}}</td><td id='panelCamp'>{{$test->created_at}}</td><td id='siteCamp' class='info'><a target='_blank' href='campaigns/{{$test->test_id}}'>See<span class='glyphicon glyphicon-share-alt'></span></a></td></tr>
            </tbody>
            @endforeach
        </table>
    </div>
    @endsection
