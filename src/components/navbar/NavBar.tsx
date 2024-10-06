import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { Menubar } from 'primereact/menubar';
import {MenuItem} from 'primereact/menuitem/menuitem';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate: any = useNavigate();
    const items: MenuItem[] = [
        {
            label: 'Home Page',
            icon: 'pi pi-home',
            
            command: () => {
                navigate('/');
            },
        },
        {
            label: 'Study Page',
            icon: 'pi pi-pen-to-square',
            
        },
        {
            label: 'Preview Page',
            icon: 'pi pi-file-check',
            
        },
        {
            label: 'Finish Page',
            icon: 'pi pi-check',
            command: () => {
                navigate('/finished');
            },
        },
]
  return (
    <>
      <div className='bottom-nav'>
      <Menubar model={items} />
      </div>
    </>
  );
};

export default NavBar;