package com.example.jeffrey.LabSite.Utils;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PdfOperation {
    public static List<String> a_degree = new ArrayList<>();
    public static List<String> b_degree = new ArrayList<>();
    public static List<String> c_degree = new ArrayList<>();
    public static String[] a_deg = new String[]{"TOCS","TOS","TCAD","TC","TPDS","PPoPP","FAST","DAC","HPCA","MICRO","SC","ASPLOS","ISCA","USENIX","JSAC","TMC","TON","SIGCOMM","MobiCom","INFOCOM","NSDI","TDSC","TIFS","CCS","EUROCRYPT","S&P","CRYPTO","USENIX","TOPLAS","TOSEM","TSE","PLDI","POPL","FSE/ESEC","SOSP","OOPSLA","ASE","ICSE","ISSTA","OSDI","TODS","TOIS","TKDE","VLDBJ","SIGMOD","SIGKDD","ICDE","SIGIR","VLDB","TIT","IANDC","SICOMP","STOC","SODA","CAV","FOCS","LICS","TOG","TIP","TVCG","ACM","SIGGRAPH","VR","IEEE","AI","TPAMI","IJCV","JMLR","AAAI","NeurIPS","ACL","CVPR","ICCV","ICML","IJCAI","TOCHI","IJHCS","CSCW","CHI","UbiComp","JACM","Proc.","WWW","RTSS"};
    public static String[] b_deg = new String[]{"TACO","TAAS","TODAES","TECS","TRETS","TVLSI","JPDC","JSA","PARCO","SoCC","SPAA","PODC","FPGA","CGO","DATE","EuroSys","HOT","CLUSTER","ICCD","ICCAD","ICDCS","CODES+ISSS","HiPEAC","SIGMETRICS","PACT","ICPP","ICS","VEE","IPDPS","Performance","HPDC","ITC","LISA","MSST","RTAS","TOIT","TOMCCAP","TOSN","CN","TCOM","TWC","SenSys","CoNEXT","SECON","IPSN","MobiSys","ICNP","MobiHoc","NOSSDAV","IWQoS","IMC","TOPS","JCS","ACSAC","ASIACRYPT","ESORICS","FSE","CSFW","SRDS","CHES","DSN","RAID","PKC","NDSS","TCC","ASE","ESE","TSC","IETS","IST","JFP","JSS","RE","SCP","SoSyM","STVR","SPE","ECOOP","ETAPS","ICPC","RE","CAiSE","ICFP","LCTES","MoDELS","CP","ICSOC","SANER","ICSME","VMCAI","ICWS","Middleware","SAS","ESEM","FM","ISSRE","HotOS","TKDD","TWEB","AEI","DKE","DMKD","EJIS","IPM","IS","JASIST","JWS","KAIS","CIKM","WSDM","PODS","DASFAA","ECML-PKDD","ISWC","ICDM","ICDT","EDBT","CIDR","SDM","TALG","TOCL","TOMS","Algorithmica","CC","FAC","FMSD","INFORMS","JCSS","JGO","JSC","MSCS","TCS","SoCG","ESA","CCC","ICALP","CADE/IJCAR","CONCUR","HSCC","SAT","TOMCCAP","CAGD","CGF","CAD","GM","TCSVT","TMM","JASA","SIIMS","Speech","ICMR","SI3D","SCA","DCC","EG","EuroVis","SGP","EGSR","ICASSP","ICME","ISMAR","PG","SPM","TAP","TSLP","AAMAS","CVIU","DKE","TAC","TASLP","TEC","TFS","TNNLS","IJAR","JAIR","JSLHR","COLT","EMNLP","ECAI","ECCV","ICRA","ICAPS","ICCBR","COLING","KR","UAI","AAMAS","PPSN","CSCW","HCI","IWC","IJHCI","UMUAI","GROUP","IUI","ITS","UIST","ECSCW","PERCOM","MobileHCI","Cognition","TASAE","TGARS","TITS","TMI","TR","TCBB","JCST","JAMIA","CogSci","BIBM","EMSOFT","ISMB","RECOMB"};
    public static String[] c_deg = new String[]{"JETC","DC","FGCS","TCC","Integration","JETTA","JGC","MICPRO","RTS","TJSC","CF","SYSTOR","NOCS","ASAP","ASP-DAC","Euro-Par","ETS","FPL","FCCM","GLSVLSI","ATS","HPCC","HiPC","MASCOTS","ISPA","CCGRID","NPC","ICA3PP","CASES","FPT","ICPADS","ISCAS","ISLPED","ISPD","HotI","VTS","CC","TNSM","JNCA","MONET","PPNA","WCMC","ANCS","APNOMS","FORTE","LCN","ICC","ICCCN","MASS","P2P","IPCCC","WoWMoM","ISCC","WCNC","Networking","IM","MSN","MSWiM","WASA","HotNets","CLSR","IMCS","IJICS","IJISP","JISA","SCN","WiSec","SACMAT","DRM","IH&MMSec","ACNS","AsiaCCS","ACISP","CT-RSA","DIMVA","DFRWS","FC","TrustCom","SEC","IFIP","IFIP","International","ISC","ICDF2C","ICICS","SecureComm","NSPW","PAM","PETS","SAC","SOUPS","HotSec","CL","IJSEKE","STTT","JLAP","JWE","SOCA","SQJ","TPLP","PEPM","PASTE","APLAS","APSEC","EASE","ICECCS","ICST","ISPASS","SCAM","COMPSAC","ICFEM","TOOLS","SCC","ICSSP","SEKE","QRS","ICSR","ICWE","SPIN","ATVA","LOPSTR","TASE","MSR","REFSQ","WICSA","DPD","I&M","IPL","IR","IJCIS","IJGIS","IJIS","IJKM","IJSWIS","JCIS","JDM","JGITM","JIIS","JSIS","APWeb","DEXA","ECIR","ESWC","WebDB","ER","MDM","SSDBM","WAIM","SSTD","PAKDD","WISE","ACTA","APAL","DAM","FUIN","LISP","IPL","JCOMPLEXITY","LOGCOM","JSL","LMCS","SIDMA","CSL","FMCAD","FSTTCS","DSAA","ICTAC","IPCO","RTA","ISAAC","MFCS","STACS","CGTA","CAVW","-427X","C&G","DCG","SPL","IET-IPR","JVCIR","MS","MTA","SPIC","TVC","CASA","CGI","INTERSPEECH","GMP","PacificVis","3DV","CAD/Graphics","ICIP","MMM","PCM","SMI","TALLIP","AIM","DSS","EAAI","ESWA","TG","IET-CVI","IVC","IDA","IJCIA","IJIS","IJNS","IJPRAI","IJUFKS","IJDAR","JETAI","KBS","NLE","NCA","NPL","PAA","PRL","WI","AISTATS","ACCV","ACML","BMVC","NLPCC","CoNLL","GECCO","ICTAI","IROS","ALT","ICANN","FG","ICDAR","ILP","KSEM","ICONIP","ICPR","ICB","IJCNN","PRICAI","NAACL","BIT","PUC","PMC","DIS","ICMI","ASSETS","GI","UIC","INTERACT","Conference","IDC","CollaborateCom","CSCWD","CoopIS","MobiQuitous","AVI","FCS","JBHI","TBD","JBI","AMIA","APBC","SMC","COSIT","ISBRA"
    };
    public static String readPDFText(String filepath){
        PDFTextStripper pdfTextStripper;
        PDDocument pdDocument;
        File file = new File(filepath);
        try{
            pdfTextStripper = new PDFTextStripper();
            pdDocument = PDDocument.load(file);
            return pdfTextStripper.getText(pdDocument);
        }catch(IOException e){
            e.printStackTrace();
        }
        return "";
    }
    public List<String> splitStringByLine(String s){
        List<String> standards = new ArrayList<>();
        standards.add("A 类");standards.add("B 类");standards.add("C 类");
        List<String> list = new ArrayList<>();
        s = s.replaceAll("\r\n"," ");
        String[] arr = s.split("一、|二、|三、");
        for(String a:arr){
            for(String flag:standards){
                if(a.contains(flag)){
                    String[] temp = a.split("1 |2 |3 |4 |5 |6 |7 |8 |9 |10 |11 |12 |13 |14 |15 |16 |17 |18 |19 |20 |21 |22 |23 |24 |25 |26 |27 |28 |29 |30 |31 |32 |33 |34 |35 |36 |37 ");
                    String[] ss = new String[temp.length-1];
                    System.arraycopy(temp, 1, ss, 0, ss.length);
                    switch (flag){
                        case "A 类":
                            for (String p :
                                    ss) {
                                String[] list_a = p.split(" ");
                                if(list_a.length>0 && !list_a[0].equals("")){
                                    a_degree.add(list_a[0]);
                                }
                            }
                            break;
                        case "B 类":
                            for (String p :
                                    ss) {
                                String[] list_b = p.split(" ");
                                if(list_b.length>0 && !list_b[0].equals("")){
                                    b_degree.add(list_b[0]);
                                }
                            }
                            break;
                        case "C 类":
                            for (String p :
                                    ss) {
                                String[] list_c = p.split(" ");
                                if(list_c.length>0 && !list_c[0].equals("")){
                                    c_degree.add(list_c[0]);
                                }
                            }
                            break;
                        default:
                            break;

                    }
                }
            }
        }
        System.out.println("*********  A  ***********");
        System.out.println(a_degree);
        System.out.println("*********  B  ***********");
        System.out.println(b_degree);
        System.out.println("*********  C  ***********");
        System.out.println(c_degree);
        return list;
    }
}
