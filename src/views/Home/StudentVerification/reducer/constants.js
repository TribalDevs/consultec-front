export const initialState = {
    getStudents: {
        loading: false,
        error: null,
        data: [
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
          ],
    },
    filterStudents: "all"
}
