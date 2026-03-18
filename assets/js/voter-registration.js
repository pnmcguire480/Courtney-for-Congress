// Voter registration page — state directory, dropdowns, search
var states = [
  {name:"Alabama",reg:"https://www.alabamainteractive.org/sos/voter_registration/voterRegistrationWelcome.action",check:"https://myinfo.alabamavotes.gov/voterview"},
  {name:"Alaska",reg:"https://voterregistration.alaska.gov/",check:"https://myvoterinformation.alaska.gov/"},
  {name:"Arizona",reg:"https://azsos.gov/elections/voting-election/register-vote-or-update-your-current-voter-information",check:"https://my.arizona.vote/WhereAmIRegistered.aspx"},
  {name:"Arkansas",reg:"https://www.sos.arkansas.gov/elections/voter-information/voter-registration-information",check:"https://www.voterview.ar-nova.org/voterview"},
  {name:"California",reg:"https://registertovote.ca.gov/",check:"https://voterstatus.sos.ca.gov/"},
  {name:"Colorado",reg:"https://www.sos.state.co.us/voter/pages/pub/olvr/verifyNewVoter.xhtml",check:"https://www.sos.state.co.us/voter/pages/pub/olvr/findVoterReg.xhtml"},
  {name:"Connecticut",reg:"https://voterregistration.ct.gov/OLVR/welcome.do",check:"https://portaldir.ct.gov/sots/LookUp.aspx"},
  {name:"Delaware",reg:"https://ivote.de.gov/voterlogin.aspx",check:"https://ivote.de.gov/voterlogin.aspx"},
  {name:"District of Columbia",reg:"https://www.vote4dc.com/ApplyInstructions/Register",check:"https://www.dcboe.org/voters/register-to-vote/check-voter-registration-status"},
  {name:"Florida",reg:"https://registertovoteflorida.gov/",check:"https://registration.elections.myflorida.com/CheckVoterStatus"},
  {name:"Georgia",reg:"https://registertovote.sos.ga.gov/GAOLVR/welcome.do",check:"https://mvp.sos.ga.gov/s/"},
  {name:"Hawaii",reg:"https://olvr.hawaii.gov/",check:"https://olvr.hawaii.gov/"},
  {name:"Idaho",reg:"https://elections.sos.idaho.gov/ElectionLink/ElectionLink/ApplicationInstructions.aspx",check:"https://elections.sos.idaho.gov/ElectionLink/ElectionLink/ViewPollingPlace.aspx"},
  {name:"Illinois",reg:"https://ova.elections.il.gov/",check:"https://www.elections.il.gov/VotingInformation/RegistrationLookup.aspx"},
  {name:"Indiana",reg:"https://indianavoters.in.gov/",check:"https://indianavoters.in.gov/"},
  {name:"Iowa",reg:"https://sos.iowa.gov/elections/voterinformation/voterregistration.html",check:"https://sos.iowa.gov/elections/voterreg/regtovote/search.aspx"},
  {name:"Kansas",reg:"https://www.kdor.ks.gov/Apps/VoterReg/default.aspx",check:"https://myvoteinfo.voteks.org/voterview"},
  {name:"Kentucky",reg:"https://vrsws.sos.ky.gov/ovrweb/",check:"https://vrsws.sos.ky.gov/VIC/"},
  {name:"Louisiana",reg:"https://www.sos.la.gov/ElectionsAndVoting/RegisterToVote/Pages/default.aspx",check:"https://voterportal.sos.la.gov/Home/VoterLogin"},
  {name:"Maine",reg:"https://www.maine.gov/sos/cec/elec/voter-info/voterreginst.html",check:"https://www.maine.gov/sos/cec/elec/data/index.html"},
  {name:"Maryland",reg:"https://voterservices.elections.maryland.gov/OnlineVoterRegistration/InstructionsStep1",check:"https://voterservices.elections.maryland.gov/VoterSearch"},
  {name:"Massachusetts",reg:"https://www.sec.state.ma.us/ovr/",check:"https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx"},
  {name:"Michigan",reg:"https://mvic.sos.state.mi.us/RegisterVoter",check:"https://mvic.sos.state.mi.us/Voter/Index"},
  {name:"Minnesota",reg:"https://www.sos.state.mn.us/elections-voting/register-to-vote/",check:"https://mnvotes.sos.mn.gov/VoterStatus.aspx"},
  {name:"Mississippi",reg:"https://www.sos.ms.gov/elections-voting/voter-registration-information",check:"https://www.msegov.com/sos/voter_registration/amiregistered/Search"},
  {name:"Missouri",reg:"https://www.sos.mo.gov/elections/goVoteMissouri/register",check:"https://voteroutreach.sos.mo.gov/portal/"},
  {name:"Montana",reg:"https://sosmt.gov/elections/vote/",check:"https://app.mt.gov/voterinfo/"},
  {name:"Nebraska",reg:"https://www.nebraska.gov/apps-sos-voter-registration/",check:"https://www.votercheck.necvr.ne.gov/voterview"},
  {name:"Nevada",reg:"https://www.registertovotenv.gov/",check:"https://www.nvsos.gov/sosvoterservices/Registration/step0.aspx"},
  {name:"New Hampshire",reg:"https://sos.nh.gov/elections/voters/register-to-vote/",check:"https://app.sos.nh.gov/viphome"},
  {name:"New Jersey",reg:"https://voter.svrs.nj.gov/register",check:"https://voter.svrs.nj.gov/registration-check"},
  {name:"New Mexico",reg:"https://portal.sos.state.nm.us/OVR/WebPages/InstructionsStep1.aspx",check:"https://voterportal.servis.sos.state.nm.us/WhereToVote.aspx"},
  {name:"New York",reg:"https://voterreg.dmv.ny.gov/MotorVoter/",check:"https://voterlookup.elections.ny.gov/"},
  {name:"North Carolina",reg:"https://www.ncsbe.gov/registering/how-register",check:"https://vt.ncsbe.gov/RegLkup/"},
  {name:"North Dakota",reg:"https://vip.sos.nd.gov/PortalListDetails.aspx?ptlhPKID=79&ptlPKID=7",check:"https://vip.sos.nd.gov/WhereToVote.aspx",note:"North Dakota does not require voter registration. Bring a valid ID to vote."},
  {name:"Ohio",reg:"https://olvr.ohiosos.gov/",check:"https://voterlookup.ohiosos.gov/voterlookup.aspx"},
  {name:"Oklahoma",reg:"https://oklahoma.gov/elections/voter-registration/register-to-vote.html",check:"https://okvoterportal.okelections.us/"},
  {name:"Oregon",reg:"https://sos.oregon.gov/voting/Pages/registration.aspx",check:"https://sos.oregon.gov/voting/Pages/mysecretaryofstate.aspx"},
  {name:"Pennsylvania",reg:"https://www.pavoterservices.pa.gov/pages/VoterRegistrationApplication.aspx",check:"https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx"},
  {name:"Rhode Island",reg:"https://vote.sos.ri.gov/",check:"https://vote.sos.ri.gov/Home/UpdateVoterRecord?ActiveFlag=0"},
  {name:"South Carolina",reg:"https://info.scvotes.sc.gov/eng/ovr/start.aspx",check:"https://info.scvotes.sc.gov/eng/voterinquiry/VoterInformationRequest.aspx?PageMode=VoterInfo"},
  {name:"South Dakota",reg:"https://sdsos.gov/elections-voting/voting/register-to-vote/default.aspx",check:"https://vip.sdsos.gov/VIPLogin.aspx"},
  {name:"Tennessee",reg:"https://ovr.govote.tn.gov/",check:"https://tnmap.tn.gov/voterlookup/"},
  {name:"Texas",reg:"https://www.votetexas.gov/register-to-vote/",check:"https://teamrv-mvp.sos.texas.gov/MVP/mvp.do"},
  {name:"Utah",reg:"https://secure.utah.gov/voterreg/index.html",check:"https://votesearch.utah.gov/voter-search/search/search-by-voter/voter-info"},
  {name:"Vermont",reg:"https://olvr.vermont.gov/",check:"https://mvp.vermont.gov/"},
  {name:"Virginia",reg:"https://www.elections.virginia.gov/citizen-portal/",check:"https://www.elections.virginia.gov/citizen-portal/"},
  {name:"Washington",reg:"https://voter.votewa.gov/WhereToVote.aspx",check:"https://voter.votewa.gov/WhereToVote.aspx"},
  {name:"West Virginia",reg:"https://ovr.sos.wv.gov/Register/Landing",check:"https://apps.sos.wv.gov/Elections/voter/amiregisteredtovote"},
  {name:"Wisconsin",reg:"https://myvote.wi.gov/en-us/Register-To-Vote",check:"https://myvote.wi.gov/en-us/My-Voter-Info"},
  {name:"Wyoming",reg:"https://sos.wyo.gov/Elections/State/RegisteringToVote.aspx",check:"https://sos.wyo.gov/Elections/State/RegisteringToVote.aspx"},
  {name:"American Samoa",reg:"https://aselectionoffice.gov/",check:"https://aselectionoffice.gov/",note:"American Samoa residents vote in local elections and presidential primaries but not in the general presidential election."},
  {name:"Guam",reg:"https://gec.guam.gov/register/",check:"https://gec.guam.gov/validate/",note:"Guam residents vote in local elections and presidential primaries but not in the general presidential election."},
  {name:"Northern Mariana Islands",reg:"https://www.votecnmi.gov.mp/",check:"https://www.votecnmi.gov.mp/",note:"CNMI residents vote in local elections and presidential primaries but not in the general presidential election."},
  {name:"Puerto Rico",reg:"https://ww2.ceepur.org/",check:"https://consulta.ceepur.org/",note:"Puerto Rico residents vote in presidential primaries but not in the general presidential election."},
  {name:"U.S. Virgin Islands",reg:"https://www.vivote.gov/",check:"https://www.vivote.gov/",note:"USVI residents vote in local elections and presidential primaries but not in the general presidential election."}
];

// Populate dropdowns
var regSelect = document.getElementById('registerSelect');
var checkSelect = document.getElementById('checkSelect');
states.forEach(function(s) {
  var o1 = document.createElement('option');
  o1.value = s.reg;
  o1.textContent = s.name;
  regSelect.appendChild(o1);
  var o2 = document.createElement('option');
  o2.value = s.check;
  o2.textContent = s.name;
  checkSelect.appendChild(o2);
});

// Handle dropdown changes
var regBtn = document.getElementById('registerBtn');
var checkBtn = document.getElementById('checkBtn');

regSelect.addEventListener('change', function() {
  if (this.value) {
    regBtn.href = this.value;
    regBtn.classList.remove('disabled');
  } else {
    regBtn.href = '#';
    regBtn.classList.add('disabled');
  }
});

checkSelect.addEventListener('change', function() {
  if (this.value) {
    checkBtn.href = this.value;
    checkBtn.classList.remove('disabled');
  } else {
    checkBtn.href = '#';
    checkBtn.classList.add('disabled');
  }
});

// Build state directory
var stateList = document.getElementById('stateList');
states.forEach(function(s) {
  var div = document.createElement('div');
  div.className = 'state-item';
  div.setAttribute('data-name', s.name.toLowerCase());
  div.innerHTML =
    '<span class="state-name">' + s.name + (s.note ? ' *' : '') + '</span>' +
    '<div class="state-links">' +
      '<a href="' + s.reg + '" class="link-register" target="_blank" rel="noopener noreferrer">Register</a>' +
      '<a href="' + s.check + '" class="link-check" target="_blank" rel="noopener noreferrer">Check Status</a>' +
    '</div>';
  stateList.appendChild(div);
});

// Search filter
document.getElementById('stateSearch').addEventListener('input', function() {
  var query = this.value.toLowerCase().trim();
  var items = stateList.querySelectorAll('.state-item');
  items.forEach(function(item) {
    if (item.getAttribute('data-name').indexOf(query) !== -1) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
});
