import React from 'react'
import { TextComponent } from 'components'
import "./styles.sass"
import { useReducer } from 'react'
import { reducer, actions, initialState } from './reducer'

export default function StudentVerification() {
  const testStudents = [
    {
      name: "Juan Perez",
      email: "juan@perez.com",
      status: "pending",
    },
    {
      name: "Maria Perez",
      email: "maria@perez.com",
      status: "verified",
    },
  ]
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const renderStudents = () => {
    
    let auxStudents = testStudents
    if (state.filterStudents != "all") {
      auxStudents = testStudents?.filter(
        (student) => student.status == state.filterStudents
      );
    }
    return auxStudents.map((student, index) => (
      <tr key={index}>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.status}</td>
        <td>
        {student.status == "pending" ? (
          <button>
            <TextComponent
              type="h3"
              text={{
                en: "Verify",
                es: "Verificar",
              }}
            />
          </button>
        ) : (
            <TextComponent
              type="h3"
              text={{
                en: "Verified",
                es: "Verificado",
              }}
            />)
        }          
        </td>
      </tr>
    ))
  }
  return (
    <div className='verification__component'>
      <div className='verification__header'>
        <TextComponent
          type="h1"
          text={{
            en: "Student verification",
            es: "Verificación de estudiantes",
          }}
        />
      </div>
      <div className='verification__table'>
        <div className='verification__table__filter'>
          <TextComponent
            type="h2"
            text={{
              en: "Filter",
              es: "Filtro",
            }}
          />
          <select 
            value={state.filterStudents} 
            onChange={(e) => {
              dispatch({type: 
                actions.FILTER_STUDENTS, 
                payload: e.target.value})
            }}>
            <option value="all">
              <TextComponent
                type="h2"
                text={{
                  en: "All students",
                  es: "Todos los estudiantes",
                }}
              />
            </option>
            <option value="pending">
              <TextComponent
                type="h2"
                text={{
                  en: "Not verified students",
                  es: "Estudiantes no verificados",
                }}
              />
            </option>
            <option value="verified">
              <TextComponent
                type="h2"
                text={{
                  en: "Verified students",
                  es: "Estudiantes verificados",
                }}
              />
            </option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <TextComponent
                  type="h2"
                  text={{
                    en: "Student",
                    es: "Estudiante",
                  }}
                />
              </th>
              <th>
                <TextComponent
                  type="h2"
                  text={{
                    en: "Email",
                    es: "Correo electrónico",
                  }}
                />
              </th>
              <th>
                <TextComponent
                  type="h2"
                  text={{
                    en: "Status",
                    es: "Estado",
                  }}
                />
              </th>
              <th>
                <TextComponent
                  type="h2"
                  text={{
                    en: "Actions",
                    es: "Acciones",
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {renderStudents()}
          </tbody>
        </table>
      </div>

    </div>
  )
}
