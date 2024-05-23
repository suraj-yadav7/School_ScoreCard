import React, { useEffect, useState } from 'react';
import './App.css';

// static data of school
const data = {
    schools: {
        'School A': {
            subjects: {
                'Math': { students: { 'student A': 80, 'student B': 95 } },
                'Science': { students: { 'student A': 90, 'student B': 75 } }
            }
        },
        'School B': {
            subjects: {
                'Math': { students: { 'student A': 60, 'student B': 70 } },
                'Science': { students: { 'student A': 50, 'student B': 65 } }
            }
        }
    }
};

const DropdownComponent = ({ currentSchool, selectedStudent }) => {
    //state handling of subject and student select
    const [selectedSubject, setSelectedSubject] = useState('');
    const [singleStudent, setSingleStudent] = useState('')

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    };
    // console.log("student selcted: ", selectedStudent)
    // console.log("school: ", currentSchool)
    // console.log("subject: ", selectedSubject)

    // Total marks calculation
    const calculateSubjectTotalMarks = (school, subject) => {
        return Object.values(data.schools[school].subjects[subject].students).reduce((sum, marks) => sum + marks, 0);
    };

    useEffect(()=>{
        // list li of students
        if(currentSchool && selectedStudent){
            const student = Object.entries(data.schools[currentSchool].subjects[selectedSubject].students).find(([student, marks]) => student == selectedStudent)
            setSingleStudent(student)
        }
    },[selectedStudent, selectedSubject])


    return (
        <div className="dropdown-container">
            <select value={selectedSubject} onChange={handleSubjectChange}>
                <option value="">Select Subject</option>
                {Object.keys(data.schools[currentSchool].subjects).map((subject) => (
                    <option key={subject} value={subject}>
                        {subject}
                    </option>
                ))}
            </select>
            {selectedSubject && (
                <>
                    {!singleStudent?<span>Total Marks: {calculateSubjectTotalMarks(currentSchool, selectedSubject)}</span>:<span>Total Mark:{singleStudent[1]}</span>}
                    <div className="student-list">
                    <h3>Students:</h3>
                    <ul>
                        {
                            selectedStudent?<div>
                                {singleStudent&&
                                <li>
                                    {singleStudent[0]}:{singleStudent[1]}
                                </li>
                                }
                            </div>:
                        Object.entries(data.schools[currentSchool].subjects[selectedSubject].students).map(([student, marks]) => (
                            <li key={student}>
                            {student}: {marks} marks
                            </li>
                        ))
                    }
                    </ul>
                </div>
                </>
            )}
        </div>
    );
};

function SchoolScore() {
    const [selectedSchool, setSelectedSchool] = useState('');
    
    // filtering state variable of student
    const [selectedStudent, setSelectedStudent] = useState('');

    const handleSchoolChange = (e) => {
        setSelectedSchool(e.target.value);
    };
    const handleStudentChange = (e) => {
        setSelectedStudent(e.target.value);
    };

    return (
        <div className="App">
            {
                selectedSchool && 
                <div>Filtering Student 
                    <select  value={selectedStudent} onChange={handleStudentChange}>
                        <option value=''>Select Student</option>
                        <option value='student A'>student A</option>
                        <option value='student B'>student B</option>
                    </select>
                </div>
            }
            <div className="dropdown-container">
                <h2>Select School</h2>
                <select value={selectedSchool} onChange={handleSchoolChange}>
                    <option value="">Select School</option>
                    {Object.keys(data.schools).map((school) => (
                        <option key={school} value={school}>
                            {school}
                        </option>
                    ))}
                </select>
            </div>
            {selectedSchool && (
                <div style={{display:'flex,', flexDirection:'column'}}>
                    <h2>{selectedSchool}</h2>
                    <DropdownComponent currentSchool={selectedSchool} selectedStudent={selectedStudent} />
                    {selectedSchool === 'School A' ? (
                        <>
                            <h2 style={{marginBottom:'0px',marginTop:'28px'}}>School B</h2>
                            <DropdownComponent currentSchool='School B' selectedStudent={selectedStudent}  />
                        </>
                    ) : (
                        <>
                            <h2 >School A</h2>
                            <DropdownComponent currentSchool='School A' selectedStudent={selectedStudent}  />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default SchoolScore;
