import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Mail, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { addEmployee, getEmployees } from '../services/api';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const Employees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newEmp = await addEmployee(form);
      setEmployees((prev) => [newEmp, ...prev]);
      setForm({ name: '', email: '', password: '', role: 'employee' });
      toast.success('Employee created');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create employee');
    } finally {
      setSubmitting(false);
    }
  };

  const roleBadge = (role) =>
    role === 'admin'
      ? 'bg-purple-100 text-purple-700'
      : 'bg-gray-100 text-gray-700';

  if (user?.role !== 'admin') {
    return (
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <p className="text-gray-700">Employees panel is for admins only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-600" />
            Employees
          </h1>
          <p className="text-gray-600">Manage your team members</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
          Add Employee
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center space-x-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              <span>{submitting ? 'Saving...' : 'Create Employee'}</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Employee List
        </h2>
        {loading ? (
          <div className="flex justify-center py-8"><Loader size="md" /></div>
        ) : (
          <div className="divide-y divide-gray-200">
            {employees.map((emp) => (
              <div key={emp._id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{emp.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span>{emp.email}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleBadge(emp.role)}`}>
                  {emp.role}
                </span>
              </div>
            ))}
            {employees.length === 0 && (
              <p className="text-gray-500 text-sm py-4 text-center">No employees yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;

