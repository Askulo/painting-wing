// Vanilla state management instead of Jotai
const pictures = [
    "DSC00680",
    "DSC00933",
    "DSC00966",
    "DSC00983",
    "DSC01011",
    "DSC01040",
    "DSC01064",
    "DSC01071",
    "DSC01103",
    "DSC01145",
    "DSC01420",
    "DSC01461",
    "DSC01489",
    "DSC02031",
    "DSC02064",
    "DSC02069",
  ];
  
  // Create pages data structure
  export const pages = [
    {
      front: "book-cover",
      back: pictures[0],
    },
  ];
  
  for (let i = 1; i < pictures.length - 1; i += 2) {
    pages.push({
      front: pictures[i % pictures.length],
      back: pictures[(i + 1) % pictures.length],
    });
  }
  
  pages.push({
    front: pictures[pictures.length - 1],
    back: "book-back",
  });
  
  // Create a store manager instead of atom
  class Store {
    constructor() {
      this.currentPage = 0;
      this.listeners = [];
      
      // Bind methods
      this.getPage = this.getPage.bind(this);
      this.setPage = this.setPage.bind(this);
      this.subscribe = this.subscribe.bind(this);
      this.unsubscribe = this.unsubscribe.bind(this);
    }
  
    getPage() {
      return this.currentPage;
    }
  
    setPage(page) {
      this.currentPage = page;
      this._notifyListeners();
      
      // Play page flip sound
      if (typeof window !== 'undefined') {
        const audio = new Audio("/audios/page-flip-01a.mp3");
        audio.play();
      }
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
      return () => this.unsubscribe(listener);
    }
  
    unsubscribe(listener) {
      this.listeners = this.listeners.filter(l => l !== listener);
    }
  
    _notifyListeners() {
      this.listeners.forEach(listener => listener(this.currentPage));
    }
  }
  
  // Create singleton instance
  const store = new Store();
  export default store;