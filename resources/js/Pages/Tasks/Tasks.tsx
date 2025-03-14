import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import {Button, FormControl, TextField} from "@mui/material";
import {useState} from "react";

export default function Tasks() {

	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					Tasks
				</h2>
			}
		>
			<Head title="Tasks" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900">
							<Link href={route("tasks.create")}>
								<Button variant="contained">Add a Task</Button>
							</Link>
						</div>
						<div className="p-6 text-gray-900">
							Display list of tasks here
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}
