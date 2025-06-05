import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import {Typography} from "@mui/material";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div className="flex justify-between">
                <Link href="/" className="mr-3 mt-2">
                    <ApplicationLogo className="h-15 w-15 fill-current text-gray-500" />
                </Link>
                <Typography variant="h3" className="text-gray-800">
                    ToDoodle
                </Typography>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
