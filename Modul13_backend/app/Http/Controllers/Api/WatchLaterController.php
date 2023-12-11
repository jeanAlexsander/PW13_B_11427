<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use app\Models\WatchLater;
use App\Models\User;
use App\Models\Contents;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class WatchLaterController extends Controller
{
    public function showWatchLaterByUser($id) {
        $user = User::find($id);
        if(!$user){
            return response([
                'message' => 'User Not Found',
                'data' => null
            ],404);
        }
        $watchLater = WatchLater::where('id_user', $user->id)->get()->load('content');
        return response([
            'message' => 'Contents of '.$user->name.' Retrieved',
            'data' => $watchLater
        ],200);

    }


    public function store(Request $request)
    {
        $storeData = $request->all();
        $contents = Contents::where('id_user', Auth::user()->id)->get();

        $validate = Validator::make($storeData,[
            'id_user' => 'required',
            'id_content' => 'required',
        ]);
        
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $idUser = Auth::user()->id;
        $user = User::find($idUser);
        if(is_null($user)){
            return response([
                'message' => 'User Not Found'
            ],404);
        }

        if(WatchLater::where('id_user', $storeData['id_user'])->where('id_content', $storeData['id_content'])->first()){
            return response([
                'message' => 'Content Already Added',
                'data' => null
            ],400);
        }

        if($contents->contains('id', $storeData['id_content'])){
            return response([
                'message' => 'Cant Add Your Own Content to Watch Later',
                'data' => null
            ],400);
        }

        $storeData['date_added'] = date('Y-m-d');
        $watchLater = WatchLater::create($storeData);

        return response([
            'message' => 'Added to Your Watch Later List',
            'data' => $watchLater,
        ],200);
    }    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $watchLater = WatchLater::find($id);

        if(is_null($watchLater)){
            return response([
                'message' => 'Watch Later Not Found',
                'data' => null
            ],404);
        }

        if($watchLater->delete()){
            return response([
                'message' => 'Remove from Your Watch Later List',
                'data' => $watchLater,
            ],200);
        }

        return response([
            'message' => 'Delete Watch Later Failed',
            'data' => null,
        ],400);
    }
}
