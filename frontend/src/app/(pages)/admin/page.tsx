// src/app/admin/page.tsx
'use client'; // Это очень важно! Объявляем компонент клиентским.

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api'; // Ваш API-клиент
import AdminContent from './AdminContent'; // Компонент с UI для админа

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRights = async () => {
      // localStorage доступен только внутри useEffect
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        // Перенаправляем, если токена нет
        router.push('/');
        return;
      }

      try {
        const response = await api.get('/auth/check-admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAdmin(true);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Ошибка проверки прав администратора:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminRights();
  }, [router]); // Добавляем router в зависимости useEffect

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isAdmin) {
    // В этом случае пользователь уже будет перенаправлен, но это дополнительная мера
    return null;
  }

  // Если проверка пройдена, рендерим компонент с UI
  return <AdminContent />;
}