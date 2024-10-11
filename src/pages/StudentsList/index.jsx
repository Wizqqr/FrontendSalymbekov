import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../axios.js';
import styles from './StudentsList.module.scss';

export const Students = () => {
    const { role } = useSelector((state) => state.auth);
    const [students, setStudents] = React.useState([]);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        if (role === 'superuser') {
            const fetchStudents = async () => {
                try {
                    const { data } = await axios.get('/students');
                    setStudents(data);
                } catch (err) {
                    setError(err.message);
                }
            };

            fetchStudents();
        }
    }, [role]);

    const assignRole = async (studentId, newRole) => {
        try {
            await axios.post('/superuser/update-role', { userId: studentId, newRole });
            setStudents((prevStudents) => prevStudents.filter(student => student._id !== studentId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (role !== 'superuser') {
        return <div className={styles.errorMessage}>Доступ запрещён.</div>;
    }

    return (
        <div className={styles.studentsContainer}>
            <h2 className={styles.title}>Список студентов</h2>
            {students.length === 0 ? (
                <p className={styles.noStudents}>Нет студентов для отображения.</p>
            ) : (
                <ul className={styles.studentsList}>
                    {students.map(student => (
                        <li key={student._id} className={styles.studentItem}>
                            <span>{student.fullName} - {student.email}</span>
                            <div className={styles.buttonGroup}>
                                <button 
                                    className={styles.roleButton} 
                                    onClick={() => assignRole(student._id, 'teacher')}
                                >
                                    Выдать учителя
                                </button>
                                <button 
                                    className={styles.roleButton} 
                                    onClick={() => assignRole(student._id, 'administration')}
                                >
                                    Выдать администрацию
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
