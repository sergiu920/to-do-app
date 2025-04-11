<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Task extends Model
{
	protected $fillable = [
		'title',
		'description',
	];

	protected static function boot()
	{
		parent::boot();

		static::creating(function ($task) {
			if (Auth::check()) {
				$task->user_id = Auth::id();
			}
		});
	}
}
