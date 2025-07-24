import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Base64EncodeDecode({ auth, app }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"><Link className='text-blue-500' href={route('apps')}>Apps</Link> &gt; {app.name}</h2>}
        >
            <Head title={app.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row flex-wrap">
                        Hello
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}