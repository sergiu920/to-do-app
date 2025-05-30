<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Tasks/Tasks', ['tasks' => Task::orderBy('created_at', 'desc')->paginate(10)]);
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
    public function store(StoreUpdateTaskRequest $request)
    {
        $validated = $request->validated();

        Task::create($validated);

        return redirect()->route('tasks.index')->with('success', "The task '{$validated['title']}' has been created successfully!");
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
