import React from "react";

interface Props {
    name: string;
    skills: string[],
    color: string;
}

const SkillCard = (props: Props) => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">{props.name}</h3>
            <div className="space-y-2">
                {props.skills.map((skill) => (
                    <div key={skill} className="flex justify-between items-center">
                        <span className="text-foreground">{skill}</span>
                        <div className="w-24 bg-secondary rounded-full h-2">
                            <div className={`${props.color} h-2 rounded-full w-5/6`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkillCard;