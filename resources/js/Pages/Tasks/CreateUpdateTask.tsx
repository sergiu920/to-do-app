import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import {Button, FormControl, TextField} from "@mui/material";


export default function CreateUpdateTask() {

	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					Create Task
				</h2>
			}
		>
			<Head title="Create Task" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

						<div className="p-6 text-gray-900">
							<FormControl>
								<TextField id="title" label="title" variant="outlined" margin="dense" />
								<TextField
									label="Description"
									multiline
									rows={4}
									variant="outlined"
									fullWidth
								/>
							</FormControl>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
