import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Apps({ auth, apps }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Apps</h2>}
        >
            <Head title="Apps" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row flex-wrap">
                        {apps.map((app) => (
                            <Link  key={app.id}
                                href={route('apps.show', app.id)}
                            >
                                <div className="w-[260px] bg-white p-4 m-4 shadow-sm sm:rounded">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                            <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-full" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                                            <p className="text-sm text-gray-600">{app.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
