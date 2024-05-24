import React, { useEffect, useState } from 'react';

// Static data of School A and School B
const data = {
  schoolA: {
    science: {
      studentA: { sem1: 30, sem2: 35, sem3: 45 },
      studentB: { sem1: 40, sem2: 20, sem3: 40 },
      studentC: { sem1: 50, sem2: 70, sem3: 60 },
    },
    maths: {
      studentA: { sem1: 60, sem2: 40, sem3: 65 },
      studentB: { sem1: 70, sem2: 50, sem3: 55 },
      studentC: { sem1: 80, sem2: 60, sem3: 45 },
    },
  },
  schoolB: {
    science: {
      studentA: { sem1: 45, sem2: 50, sem3: 60 },
      studentB: { sem1: 55, sem2: 50, sem3: 60 },
      studentC: { sem1: 65, sem2: 50, sem3: 60 },
    },
    maths: {
      studentA: { sem1: 60, sem2: 40, sem3: 60 },
      studentB: { sem1: 50, sem2: 20, sem3: 100 },
      studentC: { sem1: 30, sem2: 50, sem3: 99 },
    },
  },
};

const semesters = ['sem1', 'sem2', 'sem3'];


// Components Start Here
const FinalSchool = ()=>{

// school, subject state values
const [selectedSchool, setSelectedSchool] = useState('');
const [mathSubject, setMathSubject] = useState('');
const [scienceSubject, setScienceSubject]=useState('')

// Filtering student list and initial state when component mounted
const [studentFilter, setStudentFilter] = useState('')
const [studentList, setStudentList] = useState('')

// collapsing each section with this state
const [schoolCollaps, setSchoolCollaps] = useState(false)
const [mathsCollaps, setMathsCollaps] = useState(false)
const [scienceCollaps, setScienceCollaps] = useState(false)

// Only to disable and enable subject filter selection
const [subFilter, setSubFilter]= useState(true)

// School total calculation
const calculateSchoolTotal = (schoolData) => {
  return semesters.map((sem) =>
    Object.values(schoolData).reduce(
      (sum, subject) =>
        sum +
        Object.values(subject).reduce((subSum, student) => subSum + student[sem], 0),
      0
    )
  );
};

// Subject Total Calculation
const calculateSubjectTotal = (subjectData) => {
  return semesters.map((sem) =>
    Object.values(subjectData).reduce((sum, student) => sum + student[sem], 0)
  );
};
// console.log("key: ", Object.keys(data['schoolA']))

// Filtering subject section
const handleSubjectFilter = (e)=>{
const {value} = e.target
if(value == 'maths'){
  setScienceCollaps(false)
  setMathsCollaps(true)
}
else if(value=='science'){
  setScienceCollaps(true)
  setMathsCollaps(false)
}
else{
  setScienceCollaps(true)
  setMathsCollaps(true)
}
};

// Student list rendering & Filtering student selection
const handleStudentList = ()=>{
  let list =Object.keys(data['schoolA']['maths'])

if(studentFilter == 'studentA'){
  let filterList = list.filter((stud)=> stud=='studentA')
  setStudentList(filterList)

}
else if(studentFilter == 'studentB'){
  let filterList = list.filter((stud)=> stud=='studentB')
  setStudentList(filterList)
}
else if(studentFilter == 'studentC'){
  let filterList = list.filter((stud)=> stud=='studentC')
  setStudentList(filterList)
}
else{
  setStudentList(list)
}
};

// Initial Render all student list under 
// Each Subject and also filter each student
useEffect(()=>{
  handleStudentList()
},[studentFilter]);

return (
    <div >
    <div className='mainContainer'>
        {/* school A */}
        <div className='filterMain'>
          <div className='filtering'>
            <div className='subjectFiltering'>
          <span>Subject Filter</span>
                <select onChange={(e)=>handleSubjectFilter(e)} disabled={subFilter} >
                    <option value='' >Select Subject</option>
                    {Object.keys(data['schoolA']).map((subject,index) => (
                    <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
                </select>
            </div>
            <div className='subjectFiltering'>
          <span>Student Filter</span>
                <select onChange={(e)=> setStudentFilter(e.target.value)} disabled={selectedSchool?false:true}>
                    <option value=''>Select Student</option>
                    {Object.keys(data['schoolA']['maths']).map((student,index) => (
                    <option key={index} value={student}>
                    {student}
                  </option>
                ))}
                </select>
            </div>
            </div>
        </div>

        {/* School Tables */}
    <div className='schoolContainer'>
    <div>
        <br/>
      <table border="1">
        <thead>
          <tr className='tableHeading'>
            <th onClick={()=>{setSelectedSchool('schoolA'); setSchoolCollaps((prev)=> !prev)}}>School A {schoolCollaps?<i>&#x25B2;</i> :<i>&#x25BC;</i>} </th>
            <th colSpan={semesters.length}>Semesters</th>
          </tr>
          <tr className='tableSubHeading'>
            <th>
              All Semester
            </th>
            {semesters.map((sem) => (
              <th key={sem}>{sem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schoolCollaps ? (
            <>
              <tr className='schoolTotal'>
                <td >School A Total</td>
                {calculateSchoolTotal(data[selectedSchool]).map((total, index) => (
                  <td key={index}>{total}</td>
                ))}
              </tr>
              
              <tr><td onClick={()=> {setMathSubject('maths'); setMathsCollaps((prev)=> !prev)}}>Maths {mathsCollaps?<i>&#x25B2;</i> :<i>&#x25BC;</i>}</td></tr>
              {mathsCollaps && (
            <>
              <tr className='subjectTotal'>
                <td onClick={()=> setMathSubject('maths')}>Maths total</td>
                    {calculateSubjectTotal(data[selectedSchool][mathSubject]).map(
                        (total, index) => (
                            <td key={index}>{total}</td>
                        )
                    )}
                </tr>
            
                {studentList.map((student) => (
                    <tr key={student}>
                        <td>{student}</td>
                        {semesters.map((sem) => (
                            <td key={sem}>{data[selectedSchool][mathSubject][student][sem]}</td>
                            ))}
                        </tr>
                    ))}
                    </>
                )}
                    <tr><td onClick={()=> {setScienceSubject('science');setScienceCollaps((prev)=> !prev); setSubFilter(false)}}>science {scienceCollaps?<i>&#x25B2;</i> :<i>&#x25BC;</i>}</td></tr>
                {scienceCollaps && (
                    <>
                    <tr className='subjectTotalScience'>
                    <td onClick={()=> {setScienceSubject('science'); }}>Science total </td>
                    {calculateSubjectTotal(data[selectedSchool][scienceSubject]).map(
                        (total, index) => (
                            <td key={index}>{total}</td>
                        )
                    )}
                    </tr>
                      { studentList.map((student) => (
                          <tr key={student}>
                              <td>{student}</td>
                              {semesters.map((sem) => (
                              <td key={sem}>{data[selectedSchool][scienceSubject][student][sem]}</td>
                                  ))}
                        </tr>
                      ))
                    }
                  </>
                    )
                    }   
            </>
          ) :""
          }
        </tbody>
      </table>
    </div>



    {/* School B */}
    <div>
      <br/>
    <table border="1">
        <thead>
          <tr className='tableHeading' >
            <th onClick={()=>{setSelectedSchool('schoolA'); setSchoolCollaps((prev)=> !prev)}}>School B {schoolCollaps?<i>&#x25B2;</i> :<i>&#x25BC;</i>} </th>
            <th colSpan={semesters.length}>Semesters</th>
          </tr>
          <tr className='tableSubHeading'>
            <th>
              All Semester
            </th>
            {semesters.map((sem) => (
              <th key={sem}>{sem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schoolCollaps ? (
            <>
              <tr className='schoolTotal'>
                <td>School B Total</td>
                {calculateSchoolTotal(data['schoolB']).map((total, index) => (
                  <td key={index}>{total}</td>
                ))}
              </tr>
              
              <tr><td onClick={()=> {setMathSubject('maths'); setMathsCollaps((prev)=> !prev)}}>Maths {mathsCollaps?<i>&#x25B2;</i> :<i>&#x25BC;</i>}</td></tr>
              {mathsCollaps && (
            <>
              <tr className='subjectTotal'>
                <td onClick={()=> setMathSubject('maths')}>Maths total</td>
                    {calculateSubjectTotal(data['schoolB'][mathSubject]).map(
                        (total, index) => (
                            <td key={index}>{total}</td>
                        )
                    )}
                </tr>
            
                {studentList.map((student) => (
                    <tr key={student}>
                        <td>{student}</td>
                        {semesters.map((sem) => (
                            <td key={sem}>{data['schoolB'][mathSubject][student][sem]}</td>
                            ))}
                        </tr>
                    ))}
                    </>
                )}
                    <tr><td onClick={()=> {setScienceSubject('science');setScienceCollaps((prev)=> !prev)}}>science {scienceCollaps?<i>&#x25B2;</i> :<i>&#x25BC;</i>}</td></tr>
                {scienceCollaps && (
                    <>
                    <tr className='subjectTotalScience'>
                    <td onClick={()=> {setScienceSubject('science'); }}>Science total </td>
                    {calculateSubjectTotal(data['schoolB'][scienceSubject]).map(
                        (total, index) => (
                            <td key={index}>{total}</td>
                        )
                    )}
                    </tr>
                      { studentList.map((student) => (
                          <tr key={student}>
                              <td>{student}</td>
                              {semesters.map((sem) => (
                              <td key={sem}>{data['schoolB'][scienceSubject][student][sem]}</td>
                                  ))}
                        </tr>
                      ))
                    }
                  </>
                    )
                    }   
            </>
          ) :""
          }
        </tbody>
      </table>
    </div>
    </div>
    </div>
    </div>
  );
};
export default FinalSchool;