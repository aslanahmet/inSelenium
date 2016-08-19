<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Tests;

class TestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function add_tests(Request $request, $id = null){
       if(!$id){
           $test = new Tests();
           $test->name = $request->name;
           $test->code = $request->code;
           $test->save();
       }
       else{
           $data = array('name' => $request->name, 'code' => $request->code);
           $test = new Tests();
           $test->where('test_id',intval($id))->update($data);
       }

    }

    public function get_all_tests(){
        $tests = Tests::all();
        return view('pages.tests')->with(["tests" => $tests]);
    }
}
