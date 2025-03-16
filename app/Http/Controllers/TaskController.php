<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Tasks/Tasks');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
		return Inertia::render('Tasks/CreateUpdateTask');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
		echo "STORE METHOD";
        dd($request->all());

/*		$request->validate([
			'title' => 'required|string|max:255',
			'description' => 'required|string',
		]);

		Task::create($request->all());

		return redirect()->route('tasks.index'); // Redirect back to tasks list*/
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
