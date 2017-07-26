import DomainStore from './DomainStore';
import PubmedDomainStore from './PubmedDomainStore';

function DomainStoreFactory(service) {
  switch (service) {
    case 'pubmed':
      return PubmedDomainStore;
    default:
      return DomainStore;
  }
}

export default DomainStoreFactory;