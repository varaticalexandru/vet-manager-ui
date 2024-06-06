import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  

  const token = localStorage.getItem('token');
  if (token == null) { 
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(authReq);

  return next(authReq);
};
