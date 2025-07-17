import Footer from './Footer';
import Header from './Header';
import FlavorList from './FlavorList';

function App() {
  console.log('🏠 App component rendering');

  return (
    <div className="App">
      <Header />
      <main>
        <h1>Welcome to Sweet Ice Delights!</h1>
        <p>Your favorite Italian ice shop</p>

        <section className="featured-flavors">
          <h3>Featured Flavors</h3>
          <FlavorList limit={6} showViewAll={true} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
