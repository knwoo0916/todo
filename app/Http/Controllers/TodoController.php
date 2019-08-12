<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function postTodo(Request $req){
        $data = $req->only('name', 'date');
        $result = auth()->user()->todo()->create($data);
        return response()->json(['success'=>true,'result'=>$result]);
    }

    public function postComplete(Request $req){
        $data = $req->only('id');
        $result = auth()->user()->todo()->where('id',$data)->update(['complete' => 1]);
        return response()->json(['success'=>true,'result'=>$result]);
    }

    public function postDelete(Request $req){
        $data = $req->only('id');
        $result = auth()->user()->todo()->where('id',$data)->delete();
        return response()->json(['success'=>true,'result'=>$result]);
    }

    public function getTodoList(Request $req)
    {
        $list = auth()->user()->todo()->get();
        return response()->json(['success'=>true,'list'=>$list]);
    }
}
