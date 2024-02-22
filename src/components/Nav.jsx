import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar is-primary is-white" role="navigation" aria-label="main navigation" style={{ backgroundColor: 'glay' }}>
      <div className="container">
        <div className="navbar-brand">
          <Link to="/cruduser" className="navbar-item">


          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/crudstudents" className="navbar-item">
              <img
                src="https://cdn.discordapp.com/attachments/1146838227706195968/1209904878596530176/pngegg_24.png?ex=65e89eba&is=65d629ba&hm=8629f51b4be9b618aae49d500d6a4ef57b60cee0b11458824325acc19758b7a2&"
                alt="crudstudents"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/crudsubject" className="navbar-item">
              <img
                src="https://cdn.discordapp.com/attachments/1146838227706195968/1209904423149502484/kisspng-portable-network-graphics-book-discussion-club-cli-livro-icone-png-vector-clipart-psd-peoplepng-c-5d1f22a810ca05.0128173015623215760688.png?ex=65e89e4d&is=65d6294d&hm=feb5cd32681cba5067832530c255cc74bb1bcc27c9d6be04f38327ebf0525c60&"
                alt="AdminPage"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/crudteachers" className="navbar-item">
              <img
                src="https://cdn.discordapp.com/attachments/1146838227706195968/1209905547403337748/pngegg_25.png?ex=65e89f59&is=65d62a59&hm=c4f3fe9473444b401d53337c568832951ec7d696f0181003b072db08bcee0926&"
                alt="Players"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/cruduser" className="navbar-item">
              <img
                src="https://cdn.discordapp.com/attachments/1146838227706195968/1209902302253813840/user.png?ex=65e89c53&is=65d62753&hm=581a6f313ef5b0e7338f60172e6c9b35b6467daca1bdb6dd859e6b82c655a4bc&"
                alt="Football News"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/login" className="navbar-item">
              <img
                src="https://cdn.discordapp.com/attachments/1146838227706195968/1209927314096398366/kisspng-login-abmeldung-computer-icons-session-clip-art-register-button-5acb70ab19a2f0.4082348515232820911051.png?ex=65e8b39f&is=65d63e9f&hm=ffac0ee18aceab5172c81370ca2343468116e24fc42c49e31d77c082997e9b20&"
                alt="Football News"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>







            <div className="flex items-center">













            </div>
          </div>
        </div>
      </div>
      {/* รูปภาพด้านบน */}
      <div className="flex items-center">
        {/* เพิ่มรูปภาพด้านบนตามที่คุณต้องการ */}
      </div>
    </nav>
  );
}
