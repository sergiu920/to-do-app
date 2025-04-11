import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import {Button, Chip, FormControl, ListItemButton, ListItemText, TextField} from "@mui/material";
import {useState} from "react";
import { usePage } from "@inertiajs/react";

export default function Tasks() {

	const { flash, tasks } = usePage().props;

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

						<div className="pl-6 pr-6 pt-6 text-gray-900">
							{/* Display success message */}
							{flash?.success && (
								<>
									{flash.success}
									<Chip label="success" color="success" className={'ml-2'} />
								</>
							)}
						</div>

						<div className="p-6 text-gray-900">
							<Link href={route("tasks.create")}>
								<Button variant="contained">Add a Task</Button>
							</Link>
						</div>
						<div className="p-6 text-gray-900">
							<h1>List of tasks</h1>

							<ul>
								{tasks.map((task) => (
									<li key={task.id}>
										<ListItemButton>
											<ListItemText primary={task.title} />
										</ListItemButton>
									</li>
								))}
							</ul>

						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}
