const loadDataTables = () => {
    const teamStandings = document.querySelector('#teamStandingsTable');
    if(teamStandings){
        $(teamStandings).DataTable({
            "paging":   false,
            "ordering": true,
            "info":     false,
            "searching": false,
        }); 
    }
};
  
export default loadDataTables;