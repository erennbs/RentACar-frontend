import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  let newRequest = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token)
  })
  return next(newRequest);
};
