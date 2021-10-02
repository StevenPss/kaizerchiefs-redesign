const loadDataTables = () => {
    $('#teamStandingsTable').DataTable({
        "paging":   false,
        "ordering": true,
        "info":     false,
        "searching": false,
    });
};
  
export default loadDataTables;