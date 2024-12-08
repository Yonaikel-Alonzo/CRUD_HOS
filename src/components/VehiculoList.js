import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehiculoForm from './VehiculoForm';
import '../estilo/VehiculoList.css';

const VehiculoList = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Obtener todos los vehículos
    const fetchVehiculos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/vehiculos');
            setVehiculos(response.data);
        } catch (error) {
            console.error('Error al obtener los vehículos', error);
        }
    };

    useEffect(() => {
        fetchVehiculos();
    }, []);

    const handleAddClick = () => {
        setSelectedVehiculo(null);
        setShowForm(true);
    };

    const handleEditClick = (vehiculo) => {
        setSelectedVehiculo(vehiculo);
        setShowForm(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/vehiculos/${id}`);
            fetchVehiculos(); // Actualiza la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar el vehículo', error);
        }
    };

    const handleViewClick = (vehiculo) => {
        alert(`Detalles del vehículo:\n\nTipo: ${vehiculo.tipo_vehiculo}\nDescripción: ${vehiculo.descripcion_vehiculo}\nCategoría: ${vehiculo.categoria}`);
    };

    const handleSave = () => {
        setShowForm(false);
        fetchVehiculos(); // Vuelve a cargar los vehículos después de guardar
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div>
            <button onClick={handleAddClick} className="btn-add">Añadir Vehículo</button>
            {showForm ? (
                <VehiculoForm vehiculo={selectedVehiculo} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <div className="container">
                    <h1>Gestión de Vehículos</h1>
                    <h2>Lista de Vehículos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculos.map((vehiculo, index) => (
                                <tr key={vehiculo.id}>
                                    <td>{index + 1}</td> {/* Número basado en la posición en el array */}
                                    <td>{vehiculo.tipo_vehiculo}</td>
                                    <td>{vehiculo.descripcion_vehiculo}</td>
                                    <td>{vehiculo.categoria}</td>
                                    <td>
                                        <button onClick={() => handleViewClick(vehiculo)} className="btn-view">Ver</button>
                                        <button onClick={() => handleEditClick(vehiculo)} className="btn-edit">Editar</button>
                                        <button onClick={() => handleDeleteClick(vehiculo.id)} className="btn-delete">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VehiculoList;
