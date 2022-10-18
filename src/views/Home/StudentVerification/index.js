import React from 'react'
import { TextComponent } from 'components'
import "./styles.sass"
import { useState } from 'react'

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
  var auxStudents = [
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
  const [selected, setSelected] = useState("")

  const handleSelect = (e) => {
    console.log(e.target.value)
    setSelected(e.target.value)
    auxStudents = testStudents.filter((student) => student.status === e.target.value)
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
          <select value={selected} onChange={handleSelect}>
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
            {auxStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.status}</td>
                <td>
                  <button>
                    <TextComponent
                      type="h3"
                      text={{
                        en: "Verify",
                        es: "Verificar",
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
