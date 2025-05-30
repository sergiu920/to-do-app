<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Tasks/Tasks', ['tasks' => Task::orderBy('created_at', 'desc')->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Tasks/CreateUpdateTask');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateTaskRequest $request): RedirectResponse
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
        $task = Task::find($id);

        return Inertia::render('Tasks/CreateUpdateTask', []);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateTaskRequest $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $task = Task::find($id);

        if(!$task) {
            return back()->with('error', "Task with ID {$id} not found.");
        }

        try {
            $task->delete();
            return redirect()->back()->with('success', 'The task has been deleted successfully!');
        } catch (\Throwable $th) {
            Log::error('Failed to delete task', ['error' => $th->getMessage()]);
            return back()->with('error', 'An error occurred while deleting the task.');
        }
    }
}
