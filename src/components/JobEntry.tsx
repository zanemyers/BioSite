import React from "react";
import { Calendar } from 'lucide-react';

const jobColorMap = {
    blue: { border: 'border-blue-600', text: 'text-blue-600' },
    green: { border: 'border-green-600', text: 'text-green-600' },
    purple: { border: 'border-purple-600', text: 'text-purple-600' },
    red: { border: 'border-red-600', text: 'text-red-600' },
    orange: { border: 'border-orange-600', text: 'text-orange-600' },
} as const;

export interface JobProps {
    color: "blue" | "green" | "purple" | "red" | "orange";
    title: string;
    company: string;
    from: string;
    to: string;
    location: string;
    experiences: string[];
    olderExperience: boolean;
}

export default function JobEntry (props: JobProps) {
    const color = jobColorMap[props.color] || jobColorMap.blue;

    return (
        <div className="space-y-6 mt-4">
            <div className={`border-l-4 pl-6 ${color.border}`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                        <h3 className="text-xl font-semibold text-card-foreground">{props.title}</h3>
                        <p className={`${color.text} font-medium`}>{props.company}</p>
                    </div>
                    <div className="flex flex-col text-muted-foreground text-sm mt-1 md:mt-0 md:items-end">
                        <div className="flex items-center">
                            <Calendar size={16} className="mr-1 shrink-0"/>
                            <span>{props.from} – {props.to}</span>
                        </div>
                        <div className="mt-0.5">{props.location}</div>
                    </div>
                </div>
                {props.experiences.length > 0 && (
                    <ul className="list-disc list-outside text-muted-foreground mt-3">
                        {props.experiences.map((experience) => (
                            <li className="ms-3.5" key={experience}>{experience}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}