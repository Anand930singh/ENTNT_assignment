import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import '../../styles/HomeShip.css';

const ShipsJobEditForm = ({ job, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    priority: '',
    status: '',
    assignedEngineerId: '',
    scheduledDate: '',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        type: job.type || '',
        priority: job.priority || '',
        status: job.status || '',
        assignedEngineerId: job.assignedEngineerId || '',
        scheduledDate: job.scheduledDate || '',
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...job, ...formData });
  };

  return (
    <div className="ship-edit-overlay">
      <div className="ship-edit-container">
        <div className="ship-edit-header">
          <h2>Edit Job</h2>
          <button className="close-button" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ship-edit-form">
          <div className="form-group">
            <label htmlFor="type">Job Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <input
              type="text"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            />
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
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Progress">Progress</option>
              <option value="Completed">Completed</option>
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
