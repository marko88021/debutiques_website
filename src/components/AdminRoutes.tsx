import { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
const Login = lazy(() => import('@/pages/AdminLoginPage'));
const Gallery = lazy(() => import('@/pages/AdminGalleryPage'));
export default function AdminRoutes() {
  return <AuthProvider><Suspense fallback={<p>Loading admin…</p>}><Routes>
    <Route path="login" element={<Login />} />
    <Route path="gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
    <Route path="*" element={<Link to="/admin/login">Go to admin login</Link>} />
  </Routes></Suspense></AuthProvider>;
}
