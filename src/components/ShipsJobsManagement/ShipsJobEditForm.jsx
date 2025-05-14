import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import '../../styles/HomeShip.css';
import { useSelector } from 'react-redux';

const ShipsJobEditForm = ({ job, isAddMode, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    shipId: '',
    componentId: '',
    type: '',
    priority: '',
    status: '',
    assignedEngineerId: '',
    scheduledDate: '',
  });

  const priorities = ['High', 'Medium', 'Low'];
  const statuses = ['Open', 'Progress', 'Closed', 'Completed'];

  const [shipOptions, setShipOptions] = useState(); 
  const [componentOptions, setComponentOptions] = useState();

  const shipsReduxData = useSelector((state) => state.ships.ships || []);
  const componentReduxData = useSelector((state) => state.components.components || []);
  const userRole = useSelector((state) => state.auth.role); // 'Admin' or 'Inspector'
  console.log(userRole);
  useEffect(() => {
    if (job) {
      setFormData({
        shipId: job.shipId || '',
        componentId: job.componentId || '',
        type: job.type || '',
        priority: job.priority || '',
        status: job.status || '',
        assignedEngineerId: job.assignedEngineerId || '',
        scheduledDate: job.scheduledDate || '',
      });
    } else {
      setShipOptions(shipsReduxData);
      setComponentOptions(componentReduxData);
    }
  }, [job, shipsReduxData, componentReduxData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      ...formData,
      id: isAddMode ? `j${Date.now()}` : job.id,
    };

    // Restrict Inspector to only status & priority in edit mode
    if (userRole === 'Inspector' && !isAddMode) {
      payload = {
        id: job.id,
        status: formData.status,
        priority: formData.priority,
      };
    }

    onSave(payload);
  };

  return (
    <div className="ship-edit-overlay">
      <div className="ship-edit-container">
        <div className="ship-edit-header">
          <h2>{isAddMode ? 'Add Job' : 'Edit Job'}</h2>
          <button className="close-button" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ship-edit-form">
          {isAddMode && (
            <>
              <div className="form-group">
                <label htmlFor="shipId">Ship</label>
                <select
                  id="shipId"
                  name="shipId"
                  value={formData.shipId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Ship</option>
                  {shipOptions?.map((ship) => (
                    <option key={ship.id} value={ship.id}>
                      {ship.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="componentId">Component</label>
                <select
                  id="componentId"
                  name="componentId"
                  value={formData.componentId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Component</option>
                  {componentOptions?.map((comp) => (
                    <option key={comp.id} value={comp.id}>
                      {comp.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="type">Job Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              disabled={userRole === 'Inspector' && !isAddMode}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="assignedEngineerId">Engineer ID</label>
            <input
              type="text"
              id="assignedEngineerId"
              name="assignedEngineerId"
              value={formData.assignedEngineerId}
              onChange={handleChange}
              required
              disabled={userRole === 'Inspector' && !isAddMode}
            />
          </div>

          <div className="form-group">
            <label htmlFor="scheduledDate">Scheduled Date</label>
            <input
              type="date"
              id="scheduledDate"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
              required
              disabled={userRole === 'Inspector' && !isAddMode}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipsJobEditForm;
