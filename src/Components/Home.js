export default function Home() {
    return (
      <div class="container mt-3">
        <div class="row">
          <div class="col-6">
            <h2>Home</h2>
            <p>You use the startcode by cloning the client project and the backend project down in a folder.</p>
            <p>Remember to change the URL in settings.js if you call the backend project something different 
              than the default name.</p>
            <p>
              <a href="https://github.com/MiaSimone/CA3-Backend">Backend</a>
              <br/>
              <a href="https://github.com/MiaSimone/CA3-Frontend">Frontend</a>
            </p>  
          </div>
          <div class="col-6">
            <p>When frontend is cloned make:
              <br/> 1. npm install
              <br/> 2. npm install bootstrap
              <br/> 3. npm install react-router-dom.
            </p>
          </div>
        </div>
      </div>


    );
}