import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="12" fill="#4F46E5"/>
            <circle cx="20" cy="20" r="4" fill="white"/>
            <rect x="28" y="18" width="20" height="4" rx="2" fill="white"/>
            <circle cx="20" cy="32" r="4" fill="white"/>
            <rect x="28" y="30" width="20" height="4" rx="2" fill="white"/>
            <circle cx="20" cy="44" r="4" fill="white"/>
            <rect x="28" y="42" width="20" height="4" rx="2" fill="white"/>
        </svg>
    );
}
