import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center flex-wrap">
        <Link to="/crudstudents" className="bg-green-500 text-white button is-primary ml-4 mb-4" style={{ width: '300px', height: '200px', border: '10px solid green' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="https://cdn.discordapp.com/attachments/1146838227706195968/1209904878596530176/pngegg_24.png?ex=65e89eba&is=65d629ba&hm=8629f51b4be9b618aae49d500d6a4ef57b60cee0b11458824325acc19758b7a2&" alt="จัดการข้อมูลนักเรียน" className="mr-2 is-small" style={{ width: '50px', height: '50px' }} />
            <figcaption style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', color: 'black', textShadow: '1px 1px 2px black' }}>นักศึกษา</figcaption>
          </div>
        </Link>
        <Link to="/crudsubject" className="bg-green-500 text-white button is-primary ml-4 mb-4" style={{ width: '300px', height: '200px', border: '10px solid green' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="https://cdn.discordapp.com/attachments/1146838227706195968/1209904423149502484/kisspng-portable-network-graphics-book-discussion-club-cli-livro-icone-png-vector-clipart-psd-peoplepng-c-5d1f22a810ca05.0128173015623215760688.png?ex=65e89e4d&is=65d6294d&hm=feb5cd32681cba5067832530c255cc74bb1bcc27c9d6be04f38327ebf0525c60&" alt="จัดการข้อมูลวิชา" className="mr-2 is-small" style={{ width: '50px', height: '50px' }} />
            <figcaption style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', color: 'black', textShadow: '1px 1px 2px black' }}>วิชา</figcaption>
          </div>
        </Link>
        <Link to="/crudteachers" className="bg-green-500 text-white button is-primary ml-4 mb-4" style={{ width: '300px', height: '200px', border: '10px solid green' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="https://cdn.discordapp.com/attachments/1146838227706195968/1209905547403337748/pngegg_25.png?ex=65e89f59&is=65d62a59&hm=c4f3fe9473444b401d53337c568832951ec7d696f0181003b072db08bcee0926&" alt="ข้อมูลครู" className="mr-2 is-small" style={{ width: '50px', height: '50px' }} />
            <figcaption style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', color: 'black', textShadow: '1px 1px 2px black' }}>อาจารย์</figcaption>
          </div>
        </Link>
        <Link to="/cruduser" className="bg-green-500 text-white button is-primary ml-4 mb-4" style={{ width: '300px', height: '200px', border: '10px solid green' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="https://cdn.discordapp.com/attachments/1146838227706195968/1209902302253813840/user.png?ex=65e89c53&is=65d62753&hm=581a6f313ef5b0e7338f60172e6c9b35b6467daca1bdb6dd859e6b82c655a4bc&" alt="จัดการข้อมูลผู้ใช้" className="mr-2 is-small" style={{ width: '50px', height: '50px' }} />
            <figcaption style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', color: 'black', textShadow: '1px 1px 2px black' }}>ผู้ใช้</figcaption>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
