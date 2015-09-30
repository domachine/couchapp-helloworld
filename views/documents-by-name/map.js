function(doc) {
  if (doc.type === 'document') {
    emit(doc.name, null);
  }
}
